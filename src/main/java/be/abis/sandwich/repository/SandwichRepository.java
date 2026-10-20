package be.abis.sandwich.repository;

import be.abis.sandwich.model.Person;
import be.abis.sandwich.model.Sandwich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.io.IOException;
import java.util.List;

public interface SandwichRepository extends JpaRepository<Sandwich,Integer> {


    Sandwich findSandwichById(int id);

    Sandwich findSandwichByName(String name);

    List<Sandwich> findSandwichesByCategory(String category);


    @Modifying
    @Query(value= "UPDATE sandwiches s SET s.base_price = :base_price WHERE s.id = :id",nativeQuery = true)
    void updatePrice(@Param("id") int id, @Param("base_price") double base_price);





}
