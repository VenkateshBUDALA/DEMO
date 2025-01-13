package com.example.demo;
public class Progs {
    public static void main(String[] args) {
    int r,org;
    for(int i=100,am=0;i<1000;i++) {
    	org=i;
    	while(i!=0) {
    		r=i%10;
    		am=am+r*r*r;
    		i=i/10;
    	}
    	if(org==am)
    		System.out.println(org +" ");
       }
    }
}
