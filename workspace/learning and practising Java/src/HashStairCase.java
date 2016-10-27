import java.util.Scanner;

public class HashStairCase {
	private void hashMaker(int n)
	{
		String hash = "#";
		String space = " ";
		for(int i = 1; i<=n; i++)
		{
			for(int j = 0; j <i; j++)
			{
				String hashMaker = space.concat(hash);
				System.out.println(hashMaker);
			}
		}
	}
	
	public static void main(String[] args)
	{
		HashStairCase hm = new HashStairCase();
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter your input for which you want to generate the stair case");
		int input = sc.nextInt();
		sc.close();
		hm.hashMaker(input);
		
	}
	
}
