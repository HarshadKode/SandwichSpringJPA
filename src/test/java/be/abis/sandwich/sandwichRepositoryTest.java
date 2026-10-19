package be.abis.sandwich;

import be.abis.sandwich.model.Person;
import be.abis.sandwich.model.Sandwich;
import be.abis.sandwich.repository.SandwichRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class sandwichRepositoryTest {

    @Autowired
    SandwichRepository sandwichRepository;

//    @Test
//    public void numberOfSandwiches() {
//        List<Sandwich> sandwiches = sandwichRepository.findAllSandwiches();
//        sandwiches.forEach(System.out::println);
//        assertEquals(31, sandwiches.size());
//    }

    @Test
    public void findFirstSandwich() {
        Sandwich ActualFoundSandwich = sandwichRepository.findSandwichById(1);
        assertEquals("Hesp", ActualFoundSandwich.getName());
    }

}
