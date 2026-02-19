import asyncio
import json
import sys
import os

# Ensure we can import from local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ingestion import AudioStream
from analysis import analyze_chunk_simulation

async def main():
    print("--- VERIFICATION START ---")
    stream = AudioStream("https://www.youtube.com/watch?v=BmDLmq7aeko")
    count = 0
    
    # Manually start ingestion loop logic simulation
    stream.is_running = True
    print(f"Stream started: {stream.url}")
    
    try:
        while count < 3:
            # Simulate fetching a chunk (as per ingestion.py logic)
            await asyncio.sleep(1) 
            
            # Analyze
            result = await analyze_chunk_simulation()
            
            # Print JSON
            print("\nOBJECT #" + str(count + 1))
            print(json.dumps(result, indent=2, ensure_ascii=False))
            
            count += 1
    finally:
        stream.stop()
        print("\n--- VERIFICATION END ---")

if __name__ == "__main__":
    asyncio.run(main())
