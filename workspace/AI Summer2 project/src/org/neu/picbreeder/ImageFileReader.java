package org.neu.picbreeder;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class ImageFileReader {
	String path;//"/Users/shraddha/Documents/workspace/"
	int limit;
	List<String> filter = null;
	ImageFileReader(String path, int limit) {
		this.path = path;
		this.limit = limit;
	}
	
	public List<String> getAllImages(String extn) {
		File directory = new File(path);
		List<String> allFiles = getAllFilesInDirectory(directory, extn);
		return allFiles;
	}
	
	public void setFilter(List<String> filter) {
		this.filter = filter;
	}
	
	public String getPath() {
		return path;
	}
	
	public List<String> getImageFiles(String extn, FileCriteria fileCriteria) {
		List<String> files = new ArrayList<String>();
		File directory = new File(path);
		int count = 0;
		List<String> allFiles = getAllFilesInDirectory(directory, extn);
		for(String filePath: allFiles) {
			File file = new File(filePath);
			if(filter == null || filter.contains(file.getAbsolutePath())) {
				if(checkCriteria(file, fileCriteria)) {
					count ++;
					files.add(file.getAbsolutePath());
				}
				if(count >= limit && limit > 0) break;
			}
		}

		return files;
	}
	
	
	private List<String> getAllFilesInDirectory(File directory, String extn) {
		List<String> files = new ArrayList<String>();
		if(directory.exists() && directory.isDirectory()) {
			for(File file: directory.listFiles()) {
				if(file.isDirectory()) {
					files.addAll(getAllFilesInDirectory(file, extn));
				}else{
					if(file.getName().endsWith("."+extn)) {
						files.add(file.getAbsolutePath());
					}
				}
			}
		}
		return files;
	}
	
	private boolean checkCriteria(File file, FileCriteria fileCriteria) {
		try
		{
			ImageIcon icon = new ImageIcon(file.getAbsolutePath());
			BufferedImage b = new BufferedImage(icon.getIconWidth(), icon.getIconHeight(), BufferedImage.TYPE_INT_RGB);
			b = ImageIO.read(file);
			int imageWidth = b.getWidth();
			int imageHeight = b.getHeight();
			if(imageWidth >= fileCriteria.getMinWidth() && 
					imageWidth <= fileCriteria.getMaxWidth() &&
					imageHeight >= fileCriteria.getMinHeight() && 
					imageHeight <= fileCriteria.getMaxHeight())
			{
				return true;
			}
		}
		catch(IOException e)
		{
			System.out.println("File read error: " + e);
		}
		return false;
	}
	
	public static class FileCriteria {
		public static final FileCriteria CRITERIA_HIGH_QUALITY = new FileCriteria("HQ", 3000, 3000, 1000);
		public static final FileCriteria CRITERIA_MID_QUALITY = new FileCriteria("MQ", 2000, 2000, 750);
		public static final FileCriteria CRITERIA_LOW_QUALITY = new FileCriteria("LQ", 1000, 1000, 500);
		public static final FileCriteria CRITERIA_VERY_LOW_QUALITY = new FileCriteria("VLQ", 500, 500, 400);
		public static List<FileCriteria> allCriteria = new ArrayList<FileCriteria>();
		static {
			allCriteria.add(CRITERIA_HIGH_QUALITY);
			allCriteria.add(CRITERIA_MID_QUALITY);
			allCriteria.add(CRITERIA_LOW_QUALITY);
			allCriteria.add(CRITERIA_VERY_LOW_QUALITY);
		}
		final String name;
		final int height;
		final int weight;
		final int variance;
		public FileCriteria(String name, int height, int weight, int variance) {
			super();
			this.name = name;
			this.height = height;
			this.weight = weight;
			this.variance = variance;
		}
		public int getHeight() {
			return height;
		}
		public int getWeight() {
			return weight;
		}
		public int getVariance() {
			return variance;
		}
		
		public int getMaxHeight() {
			return height + variance;
		}
		
		public int getMinHeight() {
			return height - variance;
		}
		
		public int getMaxWidth() {
			return weight + variance;
		}
		
		public int getMinWidth() {
			return weight - variance;
		}

		@Override
		public String toString() {
			return "FileCriteria [name=" + name + ", height=" + height + ", weight=" + weight + ", variance=" + variance
					+ "]";
		}
		
	}
	
	public static void main(String[] args) {
		ImageFileReader r = new ImageFileReader("/Users/shraddha/Documents/workspace/", 2);
		List<String> files = r.getImageFiles("jpg", new FileCriteria("Q", 3000, 3000, 1000));
		for(String file: files) {
			System.out.println(file);
		}
	}
}
