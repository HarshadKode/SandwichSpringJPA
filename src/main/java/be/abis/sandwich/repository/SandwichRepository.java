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

//    @Modifying
//    @Query(value = "insert into sandwiches values (:name,:category,:description,:basePrice)", nativeQuery = true)
//    void addSandwich(@Param("name") String name, @Param("category") String category, @Param("description") String description, @Param("basePrice") double basePrice );

//    @Modifying
//    @Query("UPDATE Sandwich s SET s.base_price = :price WHERE s.id = :id")
//    Sandwich updatePrice(@Param("id") int id, @Param("base_price") double price);
//    void deleteSandwich(int id);

}
