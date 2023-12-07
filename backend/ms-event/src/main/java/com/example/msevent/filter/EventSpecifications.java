package com.example.msevent.filter;

import com.example.msevent.model.Event;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EventSpecifications {

    public static Specification<Event> filterEvents(
            String artistName,List<String> categoryNames,String country, String city, String name, LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (artistName != null && !artistName.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("artist").get("name"), artistName));
            }

            if (categoryNames != null && !categoryNames.isEmpty()) {
                predicates.add(root.get("category").get("name").in(categoryNames));
            }

            if (country != null && !country.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("venue").get("address").get("country"), country));
            }

            if (city != null && !city.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("venue").get("address").get("city"), city));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("name"), name));
            }
            if (date != null && !date.equals("")) {
                predicates.add(criteriaBuilder.equal(root.get("date"), date));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}



