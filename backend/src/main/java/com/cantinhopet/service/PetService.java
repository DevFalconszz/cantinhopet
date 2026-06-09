package com.cantinhopet.service;

import com.cantinhopet.model.Pet;
import com.cantinhopet.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> findAll(String userId) {
        return petRepository.findByUserId(userId);
    }

    public Optional<Pet> findById(Long id, String userId) {
        return petRepository.findById(id)
                .filter(p -> p.getUserId().equals(userId));
    }

    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet update(Long id, Pet petDetails, String userId) {
        Pet pet = petRepository.findById(id)
                .filter(p -> p.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com id: " + id));

        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setBreed(petDetails.getBreed());
        pet.setWeight(petDetails.getWeight());
        pet.setBirthDate(petDetails.getBirthDate());
        pet.setIsVaccinated(petDetails.getIsVaccinated());
        pet.setColor(petDetails.getColor());
        pet.setPhotoUrl(petDetails.getPhotoUrl());
        pet.setUserId(petDetails.getUserId());

        return petRepository.save(pet);
    }

    public void delete(Long id, String userId) {
        Pet pet = petRepository.findById(id)
                .filter(p -> p.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com id: " + id));
        petRepository.delete(pet);
    }

    public Pet updatePhoto(Long id, String photoUrl, String userId) {
        Pet pet = petRepository.findById(id)
                .filter(p -> p.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com id: " + id));
        pet.setPhotoUrl(photoUrl);
        return petRepository.save(pet);
    }
}
