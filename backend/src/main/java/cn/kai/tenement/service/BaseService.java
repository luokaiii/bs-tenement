package cn.kai.tenement.service;

import cn.kai.tenement.model.BaseEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @description: 基类
 * @create: 2020-03-04
 * @author: luokaiii
 */
public abstract class BaseService<T extends BaseEntity, ID extends Serializable> {

    public abstract JpaRepository<T, ID> getRepository();

    public T save(T entity) {
        return getRepository().save(entity);
    }

    public Optional<T> findById(ID id) {
        return getRepository().findById(id);
    }

    public boolean existsById(ID id) {
        return getRepository().existsById(id);
    }

    public List<T> findAll() {
        return getRepository().findAll();
    }

    public List<T> findAll(Sort sort) {
        return getRepository().findAll(sort);
    }

    public List<T> findAllById(Iterable<ID> ids) {
        return getRepository().findAllById(ids);
    }

    public Page<T> findAll(Pageable pageable) {
        return getRepository().findAll(pageable);
    }

    public List<T> findAll(Example<T> example) {
        return getRepository().findAll(example);
    }

    public Page<T> findAll(Example<T> example, Pageable pageable) {
        return getRepository().findAll(example, pageable);
    }

    public List<T> findAll(Example<T> example, Sort sort) {
        return getRepository().findAll(example, sort);
    }

    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }

    public long count() {
        return getRepository().count();
    }

    public long count(Example<T> example) {
        return getRepository().count(example);
    }
}
