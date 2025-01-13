package com.example.demo;
class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class ArrayOfObjects {
    public static void main(String[] args) {
        Student[] students = new Student[2];
        students[0] = new Student("Alice", 20);
        students[1] = new Student("Bob", 22);

        for (Student student : students) {
            System.out.println(student.name + " - " + student.age);
        }
    }
}

//wsdhjsrsdwuserjhvgaweh
