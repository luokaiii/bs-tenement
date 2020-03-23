package cn.kai.tenement.repo;

import cn.kai.tenement.model.House;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @description: 房屋接口
 * @create: 2020-03-04
 * @author: luokaiii
 */
public interface HouseRepository extends JpaRepository<House, Integer> {

    List<House> findAllByNameLikeOrKeysLikeOrEstateLike(String name, String keys, String estate);

}
