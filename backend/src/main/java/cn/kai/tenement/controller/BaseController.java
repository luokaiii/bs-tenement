package cn.kai.tenement.controller;

import cn.kai.tenement.Utils.CopyUtils;
import cn.kai.tenement.model.BaseEntity;
import cn.kai.tenement.service.BaseService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.Optional;

/**
 * @description: 基类
 * @create: 2020-03-04
 * @author: luokaiii
 */
public abstract class BaseController<T extends BaseEntity, ID extends Serializable> {

    public abstract BaseService<T, ID> getService();

    @GetMapping("/{id}")
    public ResponseEntity<T> findById(@PathVariable ID id) {
        Optional<T> optional = getService().findById(id);
        return optional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping
    public ResponseEntity<Page<T>> findByPage(T ex,
                                              @PageableDefault Pageable pageable) {
        Page<T> page = getService().findAll(Example.of(ex), pageable);
        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteById(@PathVariable ID id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable ID id,
                                    @RequestBody @Valid T ex) {
        Optional<T> optional = getService().findById(id);
        optional.ifPresent(v -> {
            CopyUtils.copyPropertiesIgnoreNull(ex, v);
            getService().save(v);
        });
        return optional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody @Valid T ex) {
        final T t = getService().save(ex);
        return ResponseEntity.ok(t);
    }
}
