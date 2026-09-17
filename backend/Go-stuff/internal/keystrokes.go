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

func (r *RollingBuffer) append(ch rune) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.disabled {
		return
	}

	r.buf.WriteRune(ch)

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

func StartCapture(buffer *RollingBuffer) {
	evchan := hook.Start()
	defer hook.End()

	for ev := range evchan {
		if ev.Kind == hook.KeyDown && ev.Keychar != 0 { // not like nav stuff, tab arrows etc
			buffer.append(rune(ev.Keychar))
		}
	}
}
