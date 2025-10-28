from typing import List, Dict
import random

class AstroService:
    """Service for astrological calculations and chart generation"""
    
    @staticmethod
    async def generate_random_chart(user_id: str, planets: List[Dict], signs: List[Dict], houses: List[Dict]) -> List[Dict]:
        """
        Gera um mapa astral aleatório (simulação para desenvolvimento)
        No futuro, será substituído por cálculos reais baseados em data/hora/local de nascimento
        """
        positions = []
        
        # Ensure we have enough data
        if len(planets) < 10 or len(signs) < 12 or len(houses) < 12:
            return positions
        
        # For each planet, assign a random sign and house
        for planet in planets:
            sign = random.choice(signs)
            house = random.choice(houses)
            degree = round(random.uniform(0, 30), 2)
            
            position = {
                "user_id": user_id,
                "planet_id": planet['id'],
                "sign_id": sign['id'],
                "house_id": house['id'],
                "degree": degree
            }
            positions.append(position)
        
        return positions
    
    @staticmethod
    async def get_chart_interpretation(positions: List[Dict], planets: Dict, signs: Dict, houses: Dict) -> Dict:
        """
        Gera uma interpretação básica do mapa astral
        """
        interpretations = []
        
        for position in positions:
            planet_id = position.get('planet_id')
            sign_id = position.get('sign_id')
            house_id = position.get('house_id')
            
            planet = planets.get(planet_id, {})
            sign = signs.get(sign_id, {})
            house = houses.get(house_id, {})
            
            interpretation = {
                "planet": planet.get('name'),
                "sign": sign.get('name'),
                "house": house.get('number'),
                "description": f"{planet.get('name')} em {sign.get('name')} na {house.get('number')}ª Casa: "
                              f"Sua {planet.get('description', '').lower()} se expressa de forma {sign.get('description', '').lower()} "
                              f"na área de {house.get('life_area', '').lower()}."
            }
            interpretations.append(interpretation)
        
        return {
            "positions": positions,
            "interpretations": interpretations
        }
