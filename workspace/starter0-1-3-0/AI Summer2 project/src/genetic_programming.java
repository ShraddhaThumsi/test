//import java.util.*;
import java.awt.image.BufferedImage;
//import java.awt.event.*;
import java.awt.*;
import java.awt.image.*;
import javax.imageio.ImageIO;
import java.io.*;
import java.io.File;
import java.io.IOException;
import javax.imageio.*;
import javax.swing.*;


public class genetic_programming 
{
	
	public static void main(String[] args) throws IOException
	{
		int image_width = 400;
		int image_height = 500;
		BufferedImage image = null;
		File file = null;
		File f = null;
		genetic_programming gp = new genetic_programming(args[0]);
		public genetic_programming(final String image_name) throws Exception
		{
			SwingUtilities.invokeLater(new Runnable()
					{
						public void run()
						{
							JFrame editorFrame = new JFrame ("Image Demo");
							editorFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
							try
							{
								file = new File("ocean1.jpg");
								System.out.println(new File("ocean1.jpg").getCanonicalPath());
								image = new BufferedImage(image_width,image_height,BufferedImage.TYPE_INT_ARGB);
								image = ImageIO.read(file);
								System.out.println("Reading complete," + "ready to work on image");
								f = new File("/Users/shraddha/Documents/");
								ImageIO.write(image, "jpg", f);
								System.out.println("writing complete, check your desktop");
								// Users/shraddha/Documents/workspace/AI Summer2 project/src/ocean1.jpg
							}
							catch(IOException e)
							{
								System.out.println("Exception:" + e);
								e.printStackTrace();
								System.exit(1);
							}
							
						}
						
					});
		
		
		}
	}
}
/*{
try

	img = ImageIO.read(new File ("ocean1.jpg"));

(catch IOException e){}
finally {}}}*/
