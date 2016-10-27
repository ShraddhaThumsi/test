import java.util.Scanner;

public class Fibonacci {

	int fibmaker(int n)
	{
		if(n == 0)
		{
			return 0;
		}
	
		if(n == 1)
		{
			return 1;
		}
		
		return fibmaker(n-2) + fibmaker(n-1);
	}
	
	public static void main(String[] args)
	{
		Scanner reader = new Scanner(System.in);  // Reading from System.in
		System.out.println("Enter a number: ");
		int n = reader.nextInt();
		reader.close();
		Fibonacci f = new Fibonacci();
		System.out.println("The fibonacci series is:" + f.fibmaker(n));
	}
}
