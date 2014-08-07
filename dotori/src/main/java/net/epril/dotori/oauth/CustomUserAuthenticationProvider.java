package net.epril.dotori.oauth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;

public class CustomUserAuthenticationProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {

		if (authentication.getPrincipal().equals("user")
				&& authentication.getCredentials().equals("user")) {

			List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
			CustomUserPasswordAuthenticationToken auth = new CustomUserPasswordAuthenticationToken(
					authentication.getPrincipal(),
					authentication.getCredentials(), grantedAuthorities);

			return auth;

		} else if (authentication.getPrincipal().equals("admin")
				&& authentication.getCredentials().equals("admin")) {
			List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
			CustomUserPasswordAuthenticationToken auth = new CustomUserPasswordAuthenticationToken(
					authentication.getPrincipal(),
					authentication.getCredentials(), grantedAuthorities);

			return auth;
		} else if (authentication.getPrincipal().equals("user1")
				&& authentication.getCredentials().equals("user1")) {
			List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
			CustomUserPasswordAuthenticationToken auth = new CustomUserPasswordAuthenticationToken(
					authentication.getPrincipal(),
					authentication.getCredentials(), grantedAuthorities);

			return auth;
		} else {
			throw new BadCredentialsException("Bad User Credentials.");
		}
	}

	@Override
	public boolean supports(Class<? extends Object> authentication) {

		return true;
	}

}
