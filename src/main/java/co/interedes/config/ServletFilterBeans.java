package co.interedes.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextListener;

import javax.servlet.annotation.WebListener;

@Configuration
@WebListener
public class ServletFilterBeans  extends RequestContextListener  {
    private static final Logger log = LoggerFactory.getLogger(ServletFilterBeans.class);

    @Bean
    public RequestContextListener requestContextListener(){
        log.info("Initializing RequestContextListener");
        return new RequestContextListener();
    }

}
