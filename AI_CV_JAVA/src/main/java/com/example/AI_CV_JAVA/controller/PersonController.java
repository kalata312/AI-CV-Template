package com.example.AI_CV_JAVA.controller;


import com.example.AI_CV_JAVA.Entity.Person;
import com.example.AI_CV_JAVA.service.interfaces.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeople() {
        List<Person> allPeopleList = personService.getAllPeople();
        return new ResponseEntity<>(allPeopleList, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Boolean> updatePersonById(@RequestBody Person person) {
        if (personService.updateById(person)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{email}")
    public ResponseEntity<Person> getPersonByEmail(@PathVariable String email) {
        Person person = personService.getPersonByEmail(email);

        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deletePerson(@PathVariable String email) {
        personService.deleteByEmail(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/emailExists/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean exists = personService.emailExists(email);
        return ResponseEntity.ok(exists);
    }

}
