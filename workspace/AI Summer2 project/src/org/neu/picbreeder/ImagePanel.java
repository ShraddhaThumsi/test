package org.neu.picbreeder;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

import javax.swing.JPanel;

class ImagePanel extends JPanel
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private BufferedImage b;
	void setImage(BufferedImage b)
	{
		this.b = b;
		repaint();
	}
	public void paintComponent(Graphics g)
	{
		if(b != null)
		{

			
			Graphics2D graph = (Graphics2D) g;

			graph.drawImage(b.getScaledInstance(getWidth(), getHeight(), Image.SCALE_SMOOTH), 0, 0, null);

		}

			
	}
}