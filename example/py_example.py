import asyncio
import websockets
currStim =0

async def talk2BCI2K():
    global currStim
    async with websockets.connect('ws://localhost:80') as websocket:
        await websocket.send(f"E 1 Get State StimulusCode")
        await websocket.recv()
        selectedTargetState = await websocket.recv()
        if(currStim != int(selectedTargetState[4])):
            currStim = int(selectedTargetState[4])
            print(selectedTargetState[4])
        await websocket.recv()

while True:

    asyncio.get_event_loop().run_until_complete(talk2BCI2K())
