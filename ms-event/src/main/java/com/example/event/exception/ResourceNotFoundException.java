package com.example.event.exception;

public class ResourceNotFoundException extends Exception{
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
