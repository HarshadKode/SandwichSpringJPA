package be.abis.sandwich.exception;

public class PriceCanNotBeUpdatedException extends RuntimeException {
    public PriceCanNotBeUpdatedException(String message) {
        super(message);
    }
}
