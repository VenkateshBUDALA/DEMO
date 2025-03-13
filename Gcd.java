package coreJava;
class GcdPro{
	int result(int a,int b) {
		int r=Math.min(a, b);
		while(r>0) {
			if(a%r==0 && b%r==0) 
				break;
		r--;
	    }
		return r;
	}
}
public class Gcd {
	public static void main(String[] args) {
		GcdPro ob=new GcdPro();
		System.out.println(ob.result(36, 60));
	}
}
