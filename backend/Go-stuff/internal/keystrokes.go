package internal

import (
	"fmt"
	"strings"
	"sync"

	hook "github.com/robotn/gohook"
)

//Internal tool, not gonna have indepth docs, im probably only one whos gonna see it :3

const maxCharLimit = 500

type RollingBuffer struct {
	mu       sync.Mutex
	buf      strings.Builder
	disabled bool
}

var keyMap = map[uint16]string{
	// Letters
	65: "a", 66: "b", 67: "c", 68: "d", 69: "e",
	70: "f", 71: "g", 72: "h", 73: "i", 74: "j",
	75: "k", 76: "l", 77: "m", 78: "n", 79: "o",
	80: "p", 81: "q", 82: "r", 83: "s", 84: "t",
	85: "u", 86: "v", 87: "w", 88: "x", 89: "y",
	90: "z",

	// Numbers
	48: "0", 49: "1", 50: "2", 51: "3", 52: "4",
	53: "5", 54: "6", 55: "7", 56: "8", 57: "9",

	// Special characters
	192: "`",
	189: "-",
	187: "=",
	219: "[",
	221: "]",
	220: "\\",
	186: ";",
	222: "'",
	188: ",",
	190: ".",
	191: "/",

	32: " ",
}
var shiftKeyMap = map[uint16]string{
	// Numbers
	48: ")",
	49: "!",
	50: "@",
	51: "#",
	52: "$",
	53: "%",
	54: "^",
	55: "&",
	56: "*",
	57: "(",

	// Special characters
	192: "~",
	189: "_",
	187: "+",
	219: "{",
	221: "}",
	220: "|",
	186: ":",
	222: "\"",
	188: "<",
	190: ">",
	191: "?",
}

func (r *RollingBuffer) append(ch string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.disabled {
		return
	}

	r.buf.WriteString(ch)

	if r.buf.Len() > maxCharLimit {
		s := r.buf.String()
		r.buf.Reset()
		r.buf.WriteString(s[len(s)-maxCharLimit:])
	}
}

func (r *RollingBuffer) Reset(disable bool) { // like when u switch textboxes it resets
	r.mu.Lock()
	defer r.mu.Unlock()
	r.buf.Reset()
	r.disabled = disable
}

func (r *RollingBuffer) SnapShot() string { //self explanatory,
	r.mu.Lock()
	defer r.mu.Unlock()
	fmt.Println("SnapShot:", r.buf.String())
	return r.buf.String()
}

var shiftDown bool

func StartCapture(buffer *RollingBuffer, events <-chan hook.Event) {
	for ev := range events {
		if ev.Kind == hook.KeyDown && ev.Rawcode != 0 && ev.Rawcode != 91 && ev.Rawcode != 162 &&
			ev.Rawcode != 13 && ev.Rawcode != 13 && ev.Rawcode != 67 &&
			ev.Rawcode != 20 && ev.Rawcode != 37 && ev.Rawcode != 38 && ev.Rawcode != 39 &&
			ev.Rawcode != 40 && ev.Rawcode != 9 || ev.Rawcode == 160 && ev.Kind == 5 {
			//Doesnt log mouse, alt, shift, capslock, windows, alt, arrors, tab, enter,ctrl, No weird keys like pgdown and stuff yet
			if ev.Rawcode == 160 && ev.Kind == 4 {
				shiftDown = true
			}
			if ev.Rawcode == 160 && ev.Kind == 5 {
				shiftDown = false
				continue
			}
			if shiftDown {
				ch := shiftKeyMap[ev.Rawcode]
				buffer.append(ch)
			} else {
				ch := keyMap[ev.Rawcode]
				buffer.append(ch)

			}

		}
	}
}
