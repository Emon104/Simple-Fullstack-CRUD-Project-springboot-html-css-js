package com.backend.demo.controller;

import com.backend.demo.entity.Student;
import com.backend.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
public class HomeController {
    @Autowired
    private StudentRepository studentRepository;
    /*
    @GetMapping("/")
public String index() {

        return "Welcome to backend app from rakib";
}

@PostMapping("/saveStudent")
    public Student saveData(@RequestBody Student student){
    studentRepository.save(student);
    return student;
}
    @GetMapping("/getStudent/{roll}")
    public Student (@PathVariable int roll){
        Optional<Student> student= studentRepository.findById(roll);
        Student student1= student.get();
        return student1;
    }

@GetMapping("/getAllStudent")
 public List<Student> getAll(){
     List<Student> studentList=  studentRepository.findAll();
     return studentList;
 }
@DeleteMapping("/deleteStudent/{roll}")
    public String deleteStudent(@PathVariable int roll){
   Student student = studentRepository.findById(roll).get();
   if(student!=null){
       studentRepository.delete(student);
   }
    return "Deleted Successfully";
 }
 @PutMapping("/updateData")
    public Student updateStudentData(@RequestBody Student student){
   studentRepository.save(student);
   return student;
 }
 */
    @GetMapping("/getStudent/{roll}")
    public ResponseEntity<?> getStudentData(@PathVariable int roll) {
        Optional<Student> existingStudentOptional = studentRepository.findById(roll);

        if (existingStudentOptional.isPresent()) {
            Student existingStudent = existingStudentOptional.get();
            return ResponseEntity.ok(existingStudent);
        } else {
            String message = "Student not found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    @GetMapping("/getAllStudent")
    public List<Student> getAll(){
        List<Student> studentList=studentRepository.findAll();
        return studentList;
    }
    @PostMapping("/saveStudent")
    public ResponseEntity<?> saveData(@RequestBody Student student) {
        Optional<Student> existingStudent =studentRepository.findById(student.getRoll());
        if (existingStudent.isPresent()) {
            String message = "Student with the same roll number already exists.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        } else {
            studentRepository.save(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(student);
        }
    }

    @PutMapping("/updateData")
    public ResponseEntity<?> updateStudentData(@RequestBody Student student) {
        Optional<Student> existingStudent = studentRepository.findById(student.getRoll());
        if (existingStudent.isPresent()) {
            studentRepository.save(student);
            return ResponseEntity.status(HttpStatus.OK).body(student);
        } else {
            String message = "Enter valid information.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    @DeleteMapping("/deleteStudent/{roll}")
    public ResponseEntity<?> deleteStudent(@PathVariable int roll) {
        Optional<Student> existingStudent = studentRepository.findById(roll);
        if (existingStudent.isPresent()) {
            String message = "Deleted Successfully";
            studentRepository.delete(existingStudent.get());
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            String message = "Student not found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

}

