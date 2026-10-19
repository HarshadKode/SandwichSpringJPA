package be.abis.sandwich.exception;

public class SandwichCanNotBeDeletedException extends RuntimeException {
    public SandwichCanNotBeDeletedException(String message) {
        super(message);
    }
}
