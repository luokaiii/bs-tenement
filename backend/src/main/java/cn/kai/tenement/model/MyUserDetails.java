package cn.kai.tenement.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

/**
 * @description: 自定义登录用户
 * @create: 2020-03-04
 * @author: luokaiii
 */
public class MyUserDetails extends User implements UserDetails {

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return getDisabled() == null || !getDisabled();
    }

}
