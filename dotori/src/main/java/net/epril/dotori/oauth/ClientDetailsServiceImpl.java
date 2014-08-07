package net.epril.dotori.oauth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.BaseClientDetails;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.NoSuchClientException;
import org.springframework.stereotype.Service;

@Service
public class ClientDetailsServiceImpl implements ClientDetailsService {

	@Override
	public ClientDetails loadClientByClientId(String clientId)
			throws OAuth2Exception {

		if (clientId.equals("client1")) {
			
			List<String> authorizedGrantTypes=new ArrayList<String>();
			authorizedGrantTypes.add("password");
			authorizedGrantTypes.add("refresh_token");
			authorizedGrantTypes.add("client_credentials");
		
			BaseClientDetails clientDetails = new BaseClientDetails();
			clientDetails.setClientId("client1");
			clientDetails.setClientSecret("client1");
			clientDetails.setAuthorizedGrantTypes(authorizedGrantTypes);
			
			return clientDetails;
			
		} else if(clientId.equals("client2")){
			
			List<String> authorizedGrantTypes=new ArrayList<String>();
			authorizedGrantTypes.add("password");
			authorizedGrantTypes.add("refresh_token");
			authorizedGrantTypes.add("client_credentials");
			
			
			BaseClientDetails clientDetails = new BaseClientDetails();
			clientDetails.setClientId("client2");
			clientDetails.setClientSecret("client2");
			clientDetails.setAuthorizedGrantTypes(authorizedGrantTypes);
			
			return clientDetails;
		}
		
		
		else{
			throw new NoSuchClientException("No client with requested id: "
					+ clientId);
		}
	}

}
