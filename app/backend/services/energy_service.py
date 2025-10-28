from typing import Dict
from models import EnergyDistribution, Position

class EnergyService:
    """Service for calculating astrological energy distributions"""
    
    @staticmethod
    async def calculate_energy_distribution(
        positions: list,
        elements: dict,
        qualities: dict,
        polarities: dict,
        signs: dict,
        planets: dict
    ) -> Dict[str, float]:
        """
        Calcula a distribuição energética baseada nas posições dos planetas
        """
        
        # Initialize counters
        element_count = {"fire": 0, "earth": 0, "air": 0, "water": 0}
        quality_count = {"cardinal": 0, "fixed": 0, "mutable": 0}
        polarity_count = {"yang": 0, "yin": 0}
        
        total_positions = len(positions)
        
        if total_positions == 0:
            return {
                "fire": 0, "earth": 0, "air": 0, "water": 0,
                "yang": 0, "yin": 0,
                "cardinal": 0, "fixed": 0, "mutable": 0
            }
        
        # Count each position's contribution
        for position in positions:
            sign_id = position.get('sign_id')
            sign = signs.get(sign_id)
            
            if sign:
                # Element
                element_id = sign.get('element_id')
                if element_id == "elem-fire":
                    element_count["fire"] += 1
                elif element_id == "elem-earth":
                    element_count["earth"] += 1
                elif element_id == "elem-air":
                    element_count["air"] += 1
                elif element_id == "elem-water":
                    element_count["water"] += 1
                
                # Quality
                quality_id = sign.get('quality_id')
                if quality_id == "qual-cardinal":
                    quality_count["cardinal"] += 1
                elif quality_id == "qual-fixed":
                    quality_count["fixed"] += 1
                elif quality_id == "qual-mutable":
                    quality_count["mutable"] += 1
                
                # Polarity
                polarity_id = sign.get('polarity_id')
                if polarity_id == "pol-yang":
                    polarity_count["yang"] += 1
                elif polarity_id == "pol-yin":
                    polarity_count["yin"] += 1
        
        # Calculate percentages
        return {
            "fire": round((element_count["fire"] / total_positions) * 100, 2),
            "earth": round((element_count["earth"] / total_positions) * 100, 2),
            "air": round((element_count["air"] / total_positions) * 100, 2),
            "water": round((element_count["water"] / total_positions) * 100, 2),
            "yang": round((polarity_count["yang"] / total_positions) * 100, 2),
            "yin": round((polarity_count["yin"] / total_positions) * 100, 2),
            "cardinal": round((quality_count["cardinal"] / total_positions) * 100, 2),
            "fixed": round((quality_count["fixed"] / total_positions) * 100, 2),
            "mutable": round((quality_count["mutable"] / total_positions) * 100, 2)
        }
