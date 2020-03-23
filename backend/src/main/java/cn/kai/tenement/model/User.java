package cn.kai.tenement.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_user")
@Data
public class User extends BaseEntity {

    private String username;

    private String password;

    private String avatar;

    private String nickname;

    private String phone;

    private Role role;

    private Boolean disabled;

    private LocalDate createDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }

    public enum Role {
        SUPER_ADMIN,
        ADMIN,
        CUSTOMER
    }
}
