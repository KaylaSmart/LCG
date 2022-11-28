/**Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id */
// TC = O(s * n); SC = O(n + s * n)
class SnapshotArray {
  constructor(length) {
      this.elements = Array(length).fill(0);    // TC: O(n); SC = O(n)
      this.snapshots = new Map();    // SC: O(s * n)
      this.snapId = -1;
  }
  set(index, val) {   // TC: O(1)
      this.elements[index] = val;
  }
  snap() {    // TC: O(n)
      ++this.snapId;
      this.snapshots.set(this.snapId, [...this.elements]);    // TC: O(n) [create deep copy of the array each time snapshot is called]
      return this.snapId;
  }
  get(index, snap_id) {   // TC: O(1)
      const snapshot = this.snapshots.has(snap_id) ? this.snapshots.get(snap_id) : [];
      return index < snapshot.length ? snapshot[index] : -1;
  }
}