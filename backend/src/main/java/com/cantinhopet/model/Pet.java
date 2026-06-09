package com.cantinhopet.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Espécie é obrigatória")
    @Column(nullable = false)
    private String species;

    private String breed;

    @PositiveOrZero(message = "Peso deve ser positivo")
    private Double weight;

    private LocalDate birthDate;

    @Column(nullable = false)
    private Boolean isVaccinated = false;

    private String color;

    @Column(length = 500)
    private String photoUrl;

    @Column(nullable = false)
    private String userId;

    public Pet() {}

    public Pet(String name, String species, String breed, Double weight,
               LocalDate birthDate, Boolean isVaccinated, String color, String photoUrl, String userId) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.weight = weight;
        this.birthDate = birthDate;
        this.isVaccinated = isVaccinated;
        this.color = color;
        this.photoUrl = photoUrl;
        this.userId = userId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public Boolean getIsVaccinated() { return isVaccinated; }
    public void setIsVaccinated(Boolean isVaccinated) { this.isVaccinated = isVaccinated; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
