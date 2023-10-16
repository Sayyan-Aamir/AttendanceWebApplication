import 'dart:io';
import 'dart:core';

void main() async{
    User t = new User();
    UserCopy uc = new UserCopy();

    print('The menu is as Follow:\n1. Press 1 to Input Username\n2. Press 2 to Print Welcome Note\n3. Press 3 to Enter Subjects\n4.Press 4 to Demonstrate OverRiding Method\n5. Press 5 to see implementation of Oop.\nPress any key to Close Menu');

   try{
    int? value = int.tryParse(stdin.readLineSync()!);
    while(value! >= 1 && value! <=5)
    {
      switch(value)
      {
        case 1:
        print(await t.askuser());
        case 2:
        print(await t.WelocomeUser());
        case 3:
        t.EnterSubjects();
        case 4:
        print(uc.UserAge());
        default:
        print(uc.intro());
      }
      print('Press New Key:');
     // String s = stdin.readLineSync()!;
      value =  int.tryParse(stdin.readLineSync()!);
    }
    print('Program Ended');
   }
   catch(e)
   {
    print('Incorrect Value');
   }
}

class User{

  // Task 1 "Delay the of 30 Seconds"
  String askuser(){
    print("Enter the Name");
    String Username = stdin.readLineSync()!;
    sleep(new Duration(seconds:2));
    return Username;
  }

 // Task 2 "Welcome the User"
   Future<String> WelocomeUser() async{
    var Username = await askuser();
    String welcome = "Welcome $Username to our Company!!";
    return welcome;
  }

// Task 3 "Enter the Subjects and Print Them"
   void EnterSubjects(){
    List<String> Subjects = [];

    for(int i=1; i<=5 ; i++)
    {
      print("Enter the Name of $i subject: ");
      Subjects.add(stdin.readLineSync()!);
    }
      PrintSubjects(Subjects);
   }

    void PrintSubjects(List<String> Subjectlist){
      print('The List of Subjects You entered');
     print("$Subjectlist");
    }
}

class UserCopy extends Pesron{

  // Task 4 "OverRide Method"
  @override
  int? UserAge(){
   print("Enter Your Age: ");
    int? age = int.tryParse(stdin.readLineSync()!);
    return age;
  }

  String intro(){
   int? age =  super.UserAge();
    return "The Age of User is: $age";
  }
}


abstract class Pesron{

  // Task 4 "OverRide Method"
  int? UserAge(){
  //print("My Age is 10");
  return 10;
  }

  String intro();
}


