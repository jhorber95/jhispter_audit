package co.interedes.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import co.interedes.domain.Dog;
import co.interedes.domain.*; // for static metamodels
import co.interedes.repository.DogRepository;
import co.interedes.service.dto.DogCriteria;

/**
 * Service for executing complex queries for {@link Dog} entities in the database.
 * The main input is a {@link DogCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Dog} or a {@link Page} of {@link Dog} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DogQueryService extends QueryService<Dog> {

    private final Logger log = LoggerFactory.getLogger(DogQueryService.class);

    private final DogRepository dogRepository;

    public DogQueryService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    /**
     * Return a {@link List} of {@link Dog} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Dog> findByCriteria(DogCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Dog> specification = createSpecification(criteria);
        return dogRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Dog} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Dog> findByCriteria(DogCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Dog> specification = createSpecification(criteria);
        return dogRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DogCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Dog> specification = createSpecification(criteria);
        return dogRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<Dog> createSpecification(DogCriteria criteria) {
        Specification<Dog> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Dog_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Dog_.name));
            }
            if (criteria.getColor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getColor(), Dog_.color));
            }
        }
        return specification;
    }
}
