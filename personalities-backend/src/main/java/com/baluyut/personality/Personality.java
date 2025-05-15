package com.baluyut.personality;

import jakarta.persistence.*;

@Entity
public class Personality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 2000)
    private String description;

    private String url;

    private String alt;

    public Personality() {}

    public Personality(String name, String description, String url, String alt) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.alt = alt;
    }

    // Getters and setters...

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public String getAlt() {
        return alt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }
}