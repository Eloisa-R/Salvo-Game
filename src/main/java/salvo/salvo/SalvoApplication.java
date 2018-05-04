package salvo.salvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

    @Bean
    public CommandLineRunner initData(PlayerRepository repository, GameRepository gRepository, GamePlayerRepository gpRepository, ShipRepository shRepository) {
        return (args) -> {
            // save a couple of players
            Player playerOne = new Player("Jack", "Bauer", "j.bauer@ctu.gov");
            Player playerTwo = new Player("Chloe", "O'Brian", "c.obrian@ctu.gov");
            Player playerThree = new Player("Kim", "Bauer", "kim_bauer@gmail.com");
            Player playerFour = new Player("David", "Palmer", "t.almeida@ctu.gov");
            repository.save(playerOne);
            repository.save(playerTwo);
            repository.save(playerThree);
            repository.save(playerFour);
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
            seventhGame.setCreationDate(new Date().from(sixthGame.getCreationDate().toInstant().plusSeconds(21600)));
            eighthGame.setCreationDate(new Date().from(sixthGame.getCreationDate().toInstant().plusSeconds(25200)));
            gRepository.save(firstGame);
            gRepository.save(secondGame);
            gRepository.save(thirdGame);
            gRepository.save(fourthGame);
            gRepository.save(fifthGame);
            gRepository.save(sixthGame);
            gRepository.save(seventhGame);
            gRepository.save(eighthGame);
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
            Ship shipOne = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"H2", "H3", "H4"}), gp_One);
            gp_One.addShip(shipOne);
            shRepository.save(shipOne);
            Ship shipTwo = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"E1", "F1", "G1"}), gp_One);
            shRepository.save(shipTwo);
            gp_One.addShip(shipTwo);
            Ship shipThree = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"B4", "B5"}), gp_One);
            shRepository.save(shipThree);
            gp_One.addShip(shipThree);
            Ship shipFour = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_OneB);
            shRepository.save(shipFour);
            gp_OneB.addShip(shipFour);
            Ship shipFive = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"F1", "F2"}), gp_OneB);
            shRepository.save(shipFive);
            gp_OneB.addShip(shipFive);
            Ship shipSix = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Two);
            shRepository.save(shipSix);
            gp_Two.addShip(shipSix);
            Ship shipSeven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Two);
            shRepository.save(shipSeven);
            gp_Two.addShip(shipSeven);
            Ship shipEight = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}), gp_Three);
            shRepository.save(shipEight);
            gp_Three.addShip(shipEight);
            Ship shipNine = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}), gp_Three);
            shRepository.save(shipNine);
            gp_Three.addShip(shipNine);
            Ship shipTen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Four);
            shRepository.save(shipTen);
            gp_Four.addShip(shipTen);
            Ship shipEleven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Four);
            shRepository.save(shipEleven);
            gp_Four.addShip(shipEleven);
            Ship shipTwelve = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}), gp_Five);
            shRepository.save(shipTwelve);
            gp_Five.addShip(shipTwelve);
            Ship shipThirteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}), gp_Five);
            shRepository.save(shipThirteen);
            gp_Five.addShip(shipThirteen);
            Ship shipFourteen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Seven);
            shRepository.save(shipFourteen);
            gp_Seven.addShip(shipFourteen);
            Ship shipFifteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Seven);
            shRepository.save(shipFifteen);
            gp_Seven.addShip(shipFifteen);
            Ship shipSixteen = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}), gp_Six);
            shRepository.save(shipSixteen);
            gp_Six.addShip(shipSixteen);
            Ship shipSeventeen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}), gp_Six);
            shRepository.save(shipSeventeen);
            gp_Six.addShip(shipSeventeen);
            Ship shipEighteen = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Eight);
            shRepository.save(shipEighteen);
            gp_Eight.addShip(shipEighteen);
            Ship shipNineteen = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Eight);
            shRepository.save(shipNineteen);
            gp_Eight.addShip(shipNineteen);
            Ship shipTwenty = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}), gp_Nine);
            shRepository.save(shipTwenty);
            gp_Nine.addShip(shipTwenty);
            Ship shipTwentyOne = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}), gp_Nine);
            shRepository.save(shipTwentyOne);
            gp_Nine.addShip(shipTwentyOne);
            Ship shipTwentyTwo = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Ten);
            shRepository.save(shipTwentyTwo);
            gp_Ten.addShip(shipTwentyTwo);
            Ship shipTwentyThree = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Ten);
            shRepository.save(shipTwentyThree);
            gp_Ten.addShip(shipTwentyThree);
            Ship shipTwentyFour = new Ship(Ship.ShipType.DESTROYER, Arrays.asList(new String[]{"B5", "C5", "D5"}), gp_Twelve);
            shRepository.save(shipTwentyFour);
            gp_Twelve.addShip(shipTwentyFour);
            Ship shipTwentyFive = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"C6", "C7"}), gp_Twelve);
            shRepository.save(shipTwentyFive);
            gp_Twelve.addShip(shipTwentyFive);
            Ship shipTwentySix = new Ship(Ship.ShipType.SUBMARINE, Arrays.asList(new String[]{"A2", "A3", "A4"}), gp_Thirteen);
            shRepository.save(shipTwentySix);
            gp_Thirteen.addShip(shipTwentySix);
            Ship shipTwentySeven = new Ship(Ship.ShipType.PATROL_BOAT, Arrays.asList(new String[]{"G6", "H6"}), gp_Thirteen);
            shRepository.save(shipTwentySeven);
            gp_Thirteen.addShip(shipTwentySeven);

        };
    }
}
