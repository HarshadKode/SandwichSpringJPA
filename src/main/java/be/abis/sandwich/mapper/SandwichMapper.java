package be.abis.sandwich.mapper;

import be.abis.sandwich.model.Sandwich;
import dto.SandwichDTO;

public class SandwichMapper {

    public static SandwichDTO toDTO(Sandwich sandwich) {
        return new SandwichDTO(sandwich.getName(), sandwich.getDescription(), sandwich.getCategory(), sandwich.getBasePrice());
    }



}


