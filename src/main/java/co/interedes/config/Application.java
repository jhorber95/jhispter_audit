package co.interedes.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.RequestContextFilter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {

    @Override protected SpringApplicationBuilder configure(SpringApplicationBuilder application ) {
        return application.sources( Application.class );
    }

    @Override public void onStartup( ServletContext servletContext ) throws ServletException {
        super.onStartup( servletContext );
        servletContext.addFilter("requestContextFilter", new RequestContextFilter() ).addMappingForUrlPatterns(null, false, "/*");
    }
}
