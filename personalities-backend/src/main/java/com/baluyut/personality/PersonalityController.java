package com.baluyut.personality;


import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/baluyut/personalities")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from frontend running on localhost:5174
public class PersonalityController {

    private final PersonalityRepository repository;

    public PersonalityController(PersonalityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Personality> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Personality addSingle(@RequestBody Personality personality) {
        return repository.save(personality);
    }

    @PostMapping("/bulk")
    public List<Personality> addBulk(@RequestBody List<Personality> personalities) {
        return repository.saveAll(personalities);
    }
}