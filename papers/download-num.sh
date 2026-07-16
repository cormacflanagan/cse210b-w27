#!/usr/bin/env bash
# Same as download.sh, but each file name is prefixed with the paper's
# entry number in ../readings.md, zero-padded so files sort in course
# order, e.g.:
#   09 - SWE-bench - Can Language Models Resolve Real-World GitHub Issues - Jimenez et al.pdf
#
# Usage:  cd papers && ./download-num.sh
exec "$(dirname "$0")/download.sh" --numbered
