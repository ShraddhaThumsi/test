package org.neu.picbreeder;

import java.awt.BorderLayout;
import java.awt.ComponentOrientation;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.RenderingHints;
import java.awt.Window;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.swing.DefaultListModel;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSlider;
import javax.swing.ListSelectionModel;
import javax.swing.SwingUtilities;
import javax.swing.SwingWorker;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import org.apache.commons.io.FileUtils;
import org.neu.picbreeder.ImageFileReader.FileCriteria;

public class BlendDisplay extends JFrame{
	private static final long serialVersionUID = 20160814L;
	private int currentFeatureValue = 50;
	private Blender blender = null;
	JFileChooser chooser;
	JButton dirPicker;
	JComboBox<FileCriteria> criterias;
	private String path = null;
	PicStrip picStrip = null;
	public BlendDisplay() {

		setDefaultCloseOperation(EXIT_ON_CLOSE);
		getContentPane().setPreferredSize(new Dimension(1000, 500));
				
		// image panel to display the full image
		// both images participating in the mixing should be of identical dimensions
		ImagePanel image_panel = new ImagePanel();
		image_panel.setSize (new Dimension (500, 500));
		getContentPane().add(image_panel, BorderLayout.CENTER);
		
		// mutation begins here
		// we will give a slider through which the amount of properties to be preserved from one image will be decided
		// that will act as the fitness function that has been input from the user.
		JSlider feature_extractor = new JSlider(JSlider.VERTICAL, 0, 100, 50);
		feature_extractor.setMinorTickSpacing(4);
		feature_extractor.setMajorTickSpacing(20);
		feature_extractor.setPaintTicks(true);
		feature_extractor.setPaintLabels(true);
		feature_extractor.setLabelTable(feature_extractor.createStandardLabels(4));
		feature_extractor.setInverted(false);
		

		ChangeListener c ;
		c= new ChangeListener ()
				{
					public void stateChanged (ChangeEvent e)
					{
						
						int feature_value = feature_extractor.getValue();
						if(currentFeatureValue != feature_value && blender != null) {
							currentFeatureValue = feature_value;
							try {
								image_panel.setImage (blender.blend2(feature_value));
								if(picStrip != null) {
									remove(picStrip);
								}
		    			    	ImageFileReader fileReader = new ImageFileReader(path, -1);
		    			    	picStrip = new PicStrip(fileReader.getImageFiles("jpg", (FileCriteria) criterias.getSelectedItem()));
		    			    	getContentPane().add(picStrip, BorderLayout.LINE_END);
							} catch (IOException e1) {
								// TODO Auto-generated catch block
								e1.printStackTrace();
							}
						}
						
					}

					
				};
		feature_extractor.addChangeListener(c);
		getContentPane().add(feature_extractor, BorderLayout.LINE_START);
		
		pack();
		setVisible(true);	
		
		JButton evolve = new JButton("Evolve");
		evolve.setSize(100, 100);

		getContentPane().add(evolve, BorderLayout.SOUTH);

		evolve.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				if(path != null) {
					ImageIcon loading = new ImageIcon(BlendDisplay.class.getResource("ajax-loader.gif"));
					BufferedImage loadingImage = new BufferedImage(loading.getIconWidth(), loading.getIconHeight(), BufferedImage.TYPE_INT_RGB);
					image_panel.setImage(loadingImage);
					image_panel.validate();
					blender = createBlender(path, (FileCriteria)criterias.getSelectedItem());
				}
				if(blender != null) {
					try {
						image_panel.setImage (blender.blend2(currentFeatureValue));
						if(picStrip != null) {
							remove(picStrip);
						}
    			    	ImageFileReader fileReader = new ImageFileReader(path, -1);
    			    	picStrip = new PicStrip(fileReader.getImageFiles("jpg", (FileCriteria) criterias.getSelectedItem()));
    			    	getContentPane().add(picStrip, BorderLayout.LINE_END);
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}else{
					image_panel.removeAll();
				}
			}
		});
		getContentPane().add(new SelectionPane(), BorderLayout.NORTH);
	}
	
	private Blender createBlender(String path, FileCriteria criteria) {

		String extn = "jpg";
		ImageFileReader fileReader = new ImageFileReader(path, -1);
		Set<String> usedParents = new HashSet<String>();
		fileReader.setFilter(picStrip.getSelectedList());
		List<String> parentList = fileReader.getImageFiles(extn, criteria);
		if(parentList.size() > 1) {
			int size = parentList.size();
			System.out.println(criteria);
			System.out.println("-------------------------------------------------------------------------------");
			for(String f: parentList) {
				System.out.println(f);
			}
			System.out.println("-------------------------------------------------------------------------------\n");
			usedParents.addAll(parentList);
			return new Blender(fileReader, criteria);
		}
		return null;
	}
	
	
	protected class SelectionPane extends JPanel {

        /**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public SelectionPane() {
            setLayout(new GridBagLayout());

            dirPicker = new JButton("Pick directory");

    		dirPicker.addActionListener(new ActionListener() {
    			
    			@Override
    			public void actionPerformed(ActionEvent e) {
    				chooser = new JFileChooser(); 
    			    chooser.setCurrentDirectory(new java.io.File("."));
    			    chooser.setDialogTitle("Choose a directory ");
    			    chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
    			    //
    			    // disable the "All files" option.
    			    //
    			    chooser.setAcceptAllFileFilterUsed(false);
    			    //    
    			    if (chooser.showOpenDialog(chooser) == JFileChooser.APPROVE_OPTION) { 
    			    	path = chooser.getSelectedFile().getAbsolutePath();
    			    	
    					String resultFileLocation = path + "/tmp/";
    					File dir = new File(resultFileLocation);
    					if(dir.exists()) {
    						try {
    							FileUtils.deleteDirectory(dir);
    						} catch (IOException e1) {
    							e1.printStackTrace();
    						}
    					}

    			    	
    			    	ImageFileReader fileReader = new ImageFileReader(path, -1);
						if(picStrip != null) {
							remove(picStrip);
						}

    			    	picStrip = new PicStrip(fileReader.getImageFiles("jpg", (FileCriteria) criterias.getSelectedItem()));
    		            getContentPane().add(picStrip, BorderLayout.LINE_END);
    			      }
    			    else {
    			      System.out.println("No Selection ");
    			      }
    			}
    		});


    		
    		FileCriteria[] criteriaList = new FileCriteria[FileCriteria.allCriteria.size()];
    		for(int i=0;i<FileCriteria.allCriteria.size();i++){
    			criteriaList[i] = FileCriteria.allCriteria.get(i);
    		}
    		criterias = new JComboBox<>(criteriaList);
    		criterias.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent e) {
					if(path != null) {	
						if(picStrip != null) {
							remove(picStrip);
						}
    			    	ImageFileReader fileReader = new ImageFileReader(path, -1);
    			    	picStrip = new PicStrip(fileReader.getImageFiles("jpg", (FileCriteria) criterias.getSelectedItem()));
    			    	getContentPane().add(picStrip, BorderLayout.LINE_END);
					}
					
				}
			});
            GridBagConstraints gbc = new GridBagConstraints();
            
            gbc.anchor = GridBagConstraints.FIRST_LINE_START;
            gbc.gridx = 0;
            gbc.gridy = 0;
            add(dirPicker, gbc);
            gbc.anchor = GridBagConstraints.FIRST_LINE_END;
            gbc.gridx = 1;
            gbc.gridy = 0;
            add(criterias, gbc);
        }
	}
	
	protected static class PicStrip extends JPanel {
		   private ImageIcon[] icons;
		   private DefaultListModel iconListModel = new DefaultListModel();
		   JList iconList = new JList(iconListModel);
		   private ImagePanel imagePanel = new ImagePanel();
		   private final List<String> imageList;
		   public PicStrip(List<String> images) {
			   this.imageList = images;
			   icons = new ImageIcon[imageList.size()];
			   iconList.setLayoutOrientation(JList.HORIZONTAL_WRAP);
			   iconList.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		      setLayout(new BorderLayout());

		        JScrollPane scrollPane = new JScrollPane(iconList);

		      add(scrollPane);

		      new SwingWorker<Void, ImageIcon>() {

		         @Override
		         protected Void doInBackground() throws Exception {
		            for (String imageUrl : images) {
		               BufferedImage img = ImageIO.read(new File(imageUrl));
		               img = ImageUtil.createScaledImage(img);
		               ImageIcon icon = new ImageIcon(img, imageUrl);
		               publish(icon);
		            }
		            return null;
		         }

		         protected void process(java.util.List<ImageIcon> chunks) {
		            for (ImageIcon icon : chunks) {
		               iconListModel.addElement(icon);
		            }
		         };

		         protected void done() {
		            Window win = SwingUtilities.getWindowAncestor(PicStrip.this);
		            win.pack();
		         };

		      }.execute();

		      iconList.setSelectionMode(ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
		      
		   }
		   
		   public List<String> getSelectedList(){
		    	  List<ImageIcon> selected = iconList.getSelectedValuesList();
		    	  List<String> val = new ArrayList<String>();
		    	  for(ImageIcon icon: selected) {
		    		  val.add(icon.getDescription());
		    	  }
		    	  return val;
		      }
	}
	
	static class ImageUtil {
		   public static final int DEST_WIDTH = 100;
		   public static final int DEST_HEIGHT = 75;
		   public static final double ASPECT_RATIO = (double) DEST_WIDTH / DEST_HEIGHT;

		   public static BufferedImage createScaledImage(BufferedImage original) {
		      double origAspectRatio = (double) original.getWidth()
		            / original.getHeight();
		      double scale = origAspectRatio > ASPECT_RATIO ? 
		            (double) DEST_WIDTH / original.getWidth() : 
		               (double) DEST_HEIGHT / original.getHeight();            
		      int newW = (int) (original.getWidth() * scale);            
		      int newH = (int) (original.getHeight() * scale);
		      BufferedImage img = new BufferedImage(DEST_WIDTH, DEST_HEIGHT,
		            BufferedImage.TYPE_INT_ARGB);
		      Graphics2D g2 = img.createGraphics();
		      g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
		            RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		      g2.drawImage(original, 0, 0, newW, newH, null);
		      g2.dispose();
		      return img;
		   }
		}
	
}
		

