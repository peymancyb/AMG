Schema structure:

classlist:{


}

class:{
  id:
  name:
  descreption:
  done:
  arrayOfStudents:
}

student:{
  name:
  surname:
  creationDate:
  present:
  absent:
  late:
  comment_array:
  mark_array:
  total_late:
  total_absent:
  total_present:
  total_mark:
  average_mark:
}



classList->class->studentList->student


so class list contains classes and each class has student list and each student has some properties



one class list has many class , one class has many student, student has many parameters , relation is one to many
