#adaptive layer: leanr which suggestions the user ACCEPTS vs IGNORES, per context
#kind, and gate weak suggestions where they rarely accept. in memory only (matches
# the no data stored design ) resets when the service restarts
class Learner:
    def __init__(self):
        self.stats = {}     

    def _bucket(self, kind):
        return self.stats.setdefault(kind, {"shown": 0, "accepted": 0})

    def record_shown(self, kind):
        self._bucket(kind)["shown"] += 1

    def record_accepted(self, kind):
        self._bucket(kind)["accepted"] += 1

    def acceptance(self, kind):
        b = self.stats.get(kind)
        if not b or b["shown"] < 5:        #not enough datat yet assume its fine
            return 1.0
        return b["accepted"] / b["shown"]

    def should_suppress(self, kind, suggestion):
        """hide a suggestion when its weak and the user rearely accpets here"""
        if not suggestion:
            return True
        if len(suggestion.strip()) < 2 and self.acceptance(kind) < 0.3:
            return True
        return False

    def snapshot(self):
        return {k: {**v, "rate": round(self.acceptance(k), 2)} for k, v in self.stats.items()}

    