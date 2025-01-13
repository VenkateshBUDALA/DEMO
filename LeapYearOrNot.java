package com.example.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;
class A{
	void leap() {
		for(int n=2000;n<=2024;n++) 
			// if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        if((n%4==0 &&n%100!=0)||(n%400==0)) 
    	  System.out.println(n);
	
}
}
public class LeapYearOrNot {
//2000, 2004, 2008, 2012, 2016, 2020, 2024.
	public static void main(String[] args){
	A ob=new A();
	ob.leap();
	}
}
