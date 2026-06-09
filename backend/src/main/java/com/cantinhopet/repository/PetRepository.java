package com.cantinhopet.repository;

import com.cantinhopet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUserId(String userId);
    List<Pet> findByNameContainingIgnoreCase(String name);
    List<Pet> findBySpeciesIgnoreCase(String species);
}
