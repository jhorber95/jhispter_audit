package co.interedes.web.rest;

import co.interedes.domain.Dog;
import co.interedes.service.DogService;
import co.interedes.web.rest.errors.BadRequestAlertException;
import co.interedes.service.dto.DogCriteria;
import co.interedes.service.DogQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link co.interedes.domain.Dog}.
 */
@RestController
@RequestMapping("/api")
public class DogResource {

    private final Logger log = LoggerFactory.getLogger(DogResource.class);

    private static final String ENTITY_NAME = "dog";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DogService dogService;

    private final DogQueryService dogQueryService;

    public DogResource(DogService dogService, DogQueryService dogQueryService) {
        this.dogService = dogService;
        this.dogQueryService = dogQueryService;
    }

    /**
     * {@code POST  /dogs} : Create a new dog.
     *
     * @param dog the dog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dog, or with status {@code 400 (Bad Request)} if the dog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dogs")
    public ResponseEntity<Dog> createDog(@RequestBody Dog dog) throws URISyntaxException {
        log.debug("REST request to save Dog : {}", dog);
        if (dog.getId() != null) {
            throw new BadRequestAlertException("A new dog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dog result = dogService.save(dog);
        return ResponseEntity.created(new URI("/api/dogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dogs} : Updates an existing dog.
     *
     * @param dog the dog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dog,
     * or with status {@code 400 (Bad Request)} if the dog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dogs")
    public ResponseEntity<Dog> updateDog(@RequestBody Dog dog) throws URISyntaxException {
        log.debug("REST request to update Dog : {}", dog);
        if (dog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dog result = dogService.save(dog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dogs} : get all the dogs.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dogs in body.
     */
    @GetMapping("/dogs")
    public ResponseEntity<List<Dog>> getAllDogs(DogCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Dogs by criteria: {}", criteria);
        Page<Dog> page = dogQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /dogs/count} : count all the dogs.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/dogs/count")
    public ResponseEntity<Long> countDogs(DogCriteria criteria) {
        log.debug("REST request to count Dogs by criteria: {}", criteria);
        return ResponseEntity.ok().body(dogQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /dogs/:id} : get the "id" dog.
     *
     * @param id the id of the dog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dogs/{id}")
    public ResponseEntity<Dog> getDog(@PathVariable Long id) {
        log.debug("REST request to get Dog : {}", id);
        Optional<Dog> dog = dogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dog);
    }

    /**
     * {@code DELETE  /dogs/:id} : delete the "id" dog.
     *
     * @param id the id of the dog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dogs/{id}")
    public ResponseEntity<Void> deleteDog(@PathVariable Long id) {
        log.debug("REST request to delete Dog : {}", id);
        dogService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
