package com.cantinhopet.controller;

import com.cantinhopet.model.Pet;
import com.cantinhopet.service.PetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public ResponseEntity<List<Pet>> findAll(@RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(petService.findAll(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> findById(@PathVariable Long id, @RequestHeader("X-User-Id") String userId) {
        return petService.findById(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pet> create(@Valid @RequestBody Pet pet, @RequestHeader("X-User-Id") String userId) {
        pet.setUserId(userId);
        Pet saved = petService.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> update(@PathVariable Long id, @Valid @RequestBody Pet pet,
                                       @RequestHeader("X-User-Id") String userId) {
        Pet updated = petService.update(id, pet, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @RequestHeader("X-User-Id") String userId) {
        petService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/photo")
    public ResponseEntity<Pet> updatePhoto(@PathVariable Long id, @RequestBody String photoUrl,
                                            @RequestHeader("X-User-Id") String userId) {
        Pet updated = petService.updatePhoto(id, photoUrl, userId);
        return ResponseEntity.ok(updated);
    }
}
