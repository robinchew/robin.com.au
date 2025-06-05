#!/bin/bash
set -e

if [ ! -f "$1" ];then
    echo "1 argument required. (eg. resume.html)";
    exit 1;
fi;

# Define the HTML input file path
html_file=$1

chrome_bin=${CHROME_BIN:-"chromium"}

# Run Chrome Headless in headless mode to generate the PDF
pdf_output="robin-chew-${html_file%.*}-"`date +%Y-%m-%d`".pdf";
input=file://`readlink -f $html_file`;
echo $input;
eval $chrome_bin  \
--headless  \
--disable-gpu \
--no-pdf-header-footer \
--print-to-pdf=$pdf_output \
$input;

# Check if PDF generation was successful
if [ -f "$pdf_output" ]; then
    echo "PDF has been generated."
else
    echo "PDF generation failed."
fi
