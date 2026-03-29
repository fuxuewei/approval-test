#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash scripts/install-musedam-rules.sh \
#     --owner fuxuewei \
#     --repo approval-test \
#     --branch main \
#     --target .cursor/rules

OWNER="fuxuewei"
REPO="approval-test"
BRANCH="main"
TARGET_DIR=".cursor/rules"
SOURCE_DIR=".cursor/rules"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --owner)
      OWNER="$2"
      shift 2
      ;;
    --repo)
      REPO="$2"
      shift 2
      ;;
    --branch)
      BRANCH="$2"
      shift 2
      ;;
    --target)
      TARGET_DIR="$2"
      shift 2
      ;;
    --source-dir)
      SOURCE_DIR="$2"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

BASE_URL="https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${SOURCE_DIR}"

RULE_FILES=(
  "00-musedam-master-workflow.mdc"
  "01-musedam-core.mdc"
  "02-musedam-figma-make-reskin.mdc"
  "03-musedam-icons.mdc"
  "04-musedam-tailwind.mdc"
  "05-musedam-globals-css.mdc"
  "06-musedam-figma-fidelity.mdc"
  "07-musedam-component-mapper.mdc"
  "09-musedam-final-validation.mdc"
  "project-context.mdc"
)

mkdir -p "${TARGET_DIR}"

echo "Installing MuseDAM rules to ${TARGET_DIR}"
echo "Source: ${BASE_URL}"

for file in "${RULE_FILES[@]}"; do
  url="${BASE_URL}/${file}"
  out="${TARGET_DIR}/${file}"
  echo " - ${file}"
  curl -fsSL "${url}" -o "${out}"
done

echo "Done. Installed ${#RULE_FILES[@]} rules into ${TARGET_DIR}."
