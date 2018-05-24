package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.*;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Date;

@SpringBootApplication
public class SalvoApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

    @Bean
    public CommandLineRunner initData(PlayerRepository repository, GameRepository gRepository, GamePlayerRepository gpRepository, ShipRepository shRepository, SalvoRepository salRepository, ScoreRepository scRepository) {
        Player playerOne = new Player("Jack", "Bauer", "j.bauer@ctu.gov", "24");
        Player playerTwo = new Player("Chloe", "O'Brian", "c.obrian@ctu.gov", "42");
        Player playerThree = new Player("Kim", "Bauer", "kim_bauer@gmail.com", "kb");
        Player playerFour = new Player("David", "Palmer", "t.almeida@ctu.gov", "mole");

        Game firstGame = new Game();
        Game secondGame = new Game();
        Game thirdGame = new Game();
        Game fourthGame = new Game();
        Game fifthGame = new Game();
        Game sixthGame = new Game();
        Game seventhGame = new Game();
        Game eighthGame = new Game();

        secondGame.setCreationDate(new Date().from(secondGame.getCreationDate().toInstant().plusSeconds(3600)));
        thirdGame.setCreationDate(new Date().from(thirdGame.getCreationDate().toInstant().plusSeconds(7200)));
        fourthGame.setCreationDate(new Date().from(fourthGame.getCreationDate().toInstant().plusSeconds(10800)));
        fifthGame.setCreationDate(new Date().from(fifthGame.getCreationDate().toInstant().plusSeconds(14400)));
        sixthGame.setCreationDate(new Date().from(sixthGame.getCreationDate().toInstant().plusSeconds(18000)));
        seventhGame.setCreationDate(new Date().from(seventhGame.getCreationDate().toInstant().plusSeconds(21600)));
        eighthGame.setCreationDate(new Date().from(eighthGame.getCreationDate().toInstant().plusSeconds(25200)));

        GamePlayer gp_One = new GamePlayer(firstGame, playerOne);
        GamePlayer gp_OneB = new GamePlayer(firstGame, playerTwo);
        GamePlayer gp_Two = new GamePlayer(secondGame, playerOne);
        GamePlayer gp_Three = new GamePlayer(secondGame, playerTwo);
        GamePlayer gp_Four = new GamePlayer(thirdGame, playerTwo);
        GamePlayer gp_Five = new GamePlayer(thirdGame, playerFour);
        GamePlayer gp_Six = new GamePlayer(fourthGame,playerOne);
        GamePlayer gp_Seven = new GamePlayer(fourthGame, playerTwo);
        GamePlayer gp_Eight = new GamePlayer(fifthGame, playerFour);
        GamePlayer gp_Nine = new GamePlayer(fifthGame, playerOne);
        GamePlayer gp_Ten = new GamePlayer(sixthGame, playerThree);
        GamePlayer gp_Eleven = new GamePlayer(seventhGame, playerFour);
        GamePlayer gp_Twelve = new GamePlayer(eighthGame, playerThree);
        GamePlayer gp_Thirteen = new GamePlayer(eighthGame, playerFour);


        Ship shipOne = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"H2", "H3", "H4"}));


        Ship shipTwo = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"E1", "F1", "G1"}));
//
        Ship shipThree = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"B4", "B5"}));

//
        Ship shipFour = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipFive = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"F1", "F2"}));

//
        Ship shipSix = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipSeven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipEight = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}));

//
        Ship shipNine = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}));

//
        Ship shipTen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipEleven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipTwelve = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}));

//
        Ship shipThirteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}));

//
        Ship shipFourteen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipFifteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipSixteen = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}));

//
        Ship shipSeventeen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}));

//
        Ship shipEighteen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipNineteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipTwenty = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}));

//
        Ship shipTwentyOne = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}));

//
        Ship shipTwentyTwo = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipTwentyThree = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipTwentyFour = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}));

//
        Ship shipTwentyFive = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}));

//
        Ship shipTwentySix = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}));

//
        Ship shipTwentySeven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}));
//

        gp_One.addShip(shipOne);
        gp_One.addShip(shipTwo);
        gp_One.addShip(shipThree);
        gp_OneB.addShip(shipFour);
        gp_OneB.addShip(shipFive);
        gp_Two.addShip(shipSix);
        gp_Two.addShip(shipSeven);
        gp_Three.addShip(shipEight);
        gp_Three.addShip(shipNine);
        gp_Four.addShip(shipTen);
        gp_Four.addShip(shipEleven);
        gp_Five.addShip(shipTwelve);
        gp_Five.addShip(shipThirteen);
        gp_Seven.addShip(shipFourteen);
        gp_Seven.addShip(shipFifteen);
        gp_Six.addShip(shipSixteen);
        gp_Six.addShip(shipSeventeen);
        gp_Eight.addShip(shipEighteen);
        gp_Eight.addShip(shipNineteen);
        gp_Nine.addShip(shipTwenty);
        gp_Nine.addShip(shipTwentyOne);
        gp_Ten.addShip(shipTwentyTwo);
        gp_Ten.addShip(shipTwentyThree);
        gp_Twelve.addShip(shipTwentyFour);
        gp_Twelve.addShip(shipTwentyFive);
        gp_Thirteen.addShip(shipTwentySix);
        gp_Thirteen.addShip(shipTwentySeven);


	    return (args) -> {
            // save a couple of players

            repository.save(playerOne);
            repository.save(playerTwo);
            repository.save(playerThree);
            repository.save(playerFour);
            gRepository.save(firstGame);
            gRepository.save(secondGame);
            gRepository.save(thirdGame);
            gRepository.save(fourthGame);
            gRepository.save(fifthGame);
            gRepository.save(sixthGame);
            gRepository.save(seventhGame);
            gRepository.save(eighthGame);




            gpRepository.save(gp_One);
            gpRepository.save(gp_OneB);
            gpRepository.save(gp_Two);
            gpRepository.save(gp_Three);
            gpRepository.save(gp_Four);
            gpRepository.save(gp_Five);
            gpRepository.save(gp_Six);
            gpRepository.save(gp_Seven);
            gpRepository.save(gp_Eight);
            gpRepository.save(gp_Nine);
            gpRepository.save(gp_Ten);
            gpRepository.save(gp_Eleven);
            gpRepository.save(gp_Twelve);
            gpRepository.save(gp_Thirteen);





            shRepository.save(shipOne);

            shRepository.save(shipTwo);

            shRepository.save(shipThree);

            shRepository.save(shipFour);

            shRepository.save(shipFive);

            shRepository.save(shipSix);

            shRepository.save(shipSeven);

            shRepository.save(shipEight);

            shRepository.save(shipNine);

            shRepository.save(shipTen);

            shRepository.save(shipEleven);

            shRepository.save(shipTwelve);

            shRepository.save(shipThirteen);

            shRepository.save(shipFourteen);

            shRepository.save(shipFifteen);

            shRepository.save(shipSixteen);

            shRepository.save(shipSeventeen);

            shRepository.save(shipEighteen);

            shRepository.save(shipNineteen);

            shRepository.save(shipTwenty);

            shRepository.save(shipTwentyOne);

            shRepository.save(shipTwentyTwo);

            shRepository.save(shipTwentyThree);

            shRepository.save(shipTwentyFour);

            shRepository.save(shipTwentyFive);

            shRepository.save(shipTwentySix);

            shRepository.save(shipTwentySeven);




            salRepository.save(new Salvo(gp_One,1, Arrays.asList(new String[]{"B5", "C5", "F1"})));
            salRepository.save(new Salvo(gp_OneB,1, Arrays.asList(new String[]{"B4", "B5", "B6"})));
            salRepository.save(new Salvo(gp_One,2, Arrays.asList(new String[]{"F2", "D5"})));
            salRepository.save(new Salvo(gp_OneB,2, Arrays.asList(new String[]{"E1", "H3", "A2"})));
            salRepository.save(new Salvo(gp_Two,1, Arrays.asList(new String[]{"A2", "A4", "G6"})));
            salRepository.save(new Salvo(gp_Three,1, Arrays.asList(new String[]{"B5", "D5", "C7"})));
            salRepository.save(new Salvo(gp_Two,2, Arrays.asList(new String[]{"A3", "H6"})));
            salRepository.save(new Salvo(gp_Three,2, Arrays.asList(new String[]{"C5", "C6"})));
            salRepository.save(new Salvo(gp_Four,1, Arrays.asList(new String[]{"G6", "H6", "A4"})));
            salRepository.save(new Salvo(gp_Five,1, Arrays.asList(new String[]{"H1", "H2", "H3"})));
            salRepository.save(new Salvo(gp_Four,2, Arrays.asList(new String[]{"A2", "A3", "D8"})));
            salRepository.save(new Salvo(gp_Five,2, Arrays.asList(new String[]{"E1", "F2", "G3"})));
            salRepository.save(new Salvo(gp_Seven,1, Arrays.asList(new String[]{"A3", "A4", "F7"})));
            salRepository.save(new Salvo(gp_Six,1, Arrays.asList(new String[]{"B5", "C6", "H1"})));
            salRepository.save(new Salvo(gp_Seven,2, Arrays.asList(new String[]{"A2", "G6", "H6"})));
            salRepository.save(new Salvo(gp_Six,2, Arrays.asList(new String[]{"C5", "C7", "D5"})));
            salRepository.save(new Salvo(gp_Eight,1, Arrays.asList(new String[]{"A1", "A2", "A3"})));
            salRepository.save(new Salvo(gp_Nine,1, Arrays.asList(new String[]{"B5", "B6", "C7"})));
            salRepository.save(new Salvo(gp_Eight,2, Arrays.asList(new String[]{"G6", "G7", "G8"})));
            salRepository.save(new Salvo(gp_Nine,2, Arrays.asList(new String[]{"C6", "D6", "E6"})));
            salRepository.save(new Salvo(gp_Nine,3, Arrays.asList(new String[]{"H1", "H8"})));
            scRepository.save(new Score(firstGame, playerOne,1,new Date().from(firstGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(firstGame, playerTwo,0,new Date().from(firstGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(secondGame, playerOne,0.5,new Date().from(secondGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(secondGame, playerTwo,0.5,new Date().from(secondGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(thirdGame, playerTwo,1,new Date().from(thirdGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(thirdGame, playerFour,0,new Date().from(thirdGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(fourthGame, playerTwo,0.5,new Date().from(fourthGame.getCreationDate().toInstant().plusSeconds(1800))));
            scRepository.save(new Score(fourthGame, playerOne,0.5,new Date().from(fourthGame.getCreationDate().toInstant().plusSeconds(1800))));
        };
    }
}

@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(inputName-> {
            Player player = playerRepository.findByUserName(inputName);
            if (player != null) {
                return new User(player.getUserName(), player.getPassword(),
                        AuthorityUtils.createAuthorityList("USER"));
            } else {
                throw new UsernameNotFoundException("Unknown user: " + inputName);
            }
        });
    }

}

@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    PlayerRepository playerRepository;

    @SuppressWarnings("deprecation")
    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/games").permitAll()
                .antMatchers(HttpMethod.POST, "/api/players").permitAll()
                .antMatchers("/api/scores").permitAll()
                .antMatchers("/login.html").permitAll()
                .antMatchers("/**.js").permitAll()
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .antMatchers("/**").hasAuthority("USER")
                .and()
                .formLogin();
        http.formLogin()
                .usernameParameter("name")
                .passwordParameter("pwd")
                .loginPage("/api/login");

        http.logout().logoutUrl("/api/logout");
        http.cors();
        http.csrf().disable();
        http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));
        http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
        http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

    }

    private void clearAuthenticationAttributes(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        }

    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(Arrays.asList("*"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

}


