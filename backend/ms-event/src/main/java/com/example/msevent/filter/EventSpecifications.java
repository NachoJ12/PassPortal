package com.example.msevent.filter;

import com.example.msevent.model.Event;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class EventSpecifications {

    public static Specification<Event> filterEvents(
            String artistName,List<String> categoryNames,String country, String city) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (artistName != null) {
                predicates.add(criteriaBuilder.equal(root.get("artist").get("name"), artistName));
            }

            if (categoryNames != null && !categoryNames.isEmpty()) {
                predicates.add(root.get("category").get("name").in(categoryNames));
            }

            if (country != null) {
                predicates.add(criteriaBuilder.equal(root.get("venue").get("address").get("country"), country));
            }

            if (city != null) {
                predicates.add(criteriaBuilder.equal(root.get("venue").get("address").get("city"), city));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}



