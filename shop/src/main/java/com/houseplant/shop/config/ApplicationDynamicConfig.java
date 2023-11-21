package com.houseplant.shop.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "com.shop")
public class ApplicationDynamicConfig {

    private SecurityConfig securityConfig;

    @Data
    public static class SecurityConfig {
        private String[] authWitheList;
        private String[] adminEndpointsList;
        private String[] securedEndpoints;
    }

}
