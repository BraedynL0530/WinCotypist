package main

import (
	"fmt"
	"os"

	"github.com/BraedynL0530/WinCotypist/internal"
)

func main() {
	buffer := &internal.RollingBuffer{} // add non zero values in prod
	server, err := internal.StartServer("8080", func(incomingData string) {
		fmt.Println("Go from python:", incomingData)

		if incomingData != "" { //TODO:MAKE THIS TRIGGER ON TAB!!!
			err := internal.Insert(incomingData)
			if err != nil {
				fmt.Println(err)
			}
		}

	})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	defer server.Close()

	go internal.StartCapture(buffer) // temp doesnt even have buffer

	go func() {
		//every time user presses space it should send  it over to python
	}()

}
